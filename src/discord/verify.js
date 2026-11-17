// Every request from Discord is signed. We check the signature so nobody
// else can pretend to be Discord and talk to Auracle.

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

async function importPublicKey(hex) {
  const raw = hexToBytes(hex);
  try {
    return await crypto.subtle.importKey('raw', raw, { name: 'Ed25519' }, false, ['verify']);
  } catch {
    return await crypto.subtle.importKey(
      'raw',
      raw,
      { name: 'NODE-ED25519', namedCurve: 'NODE-ED25519' },
      false,
      ['verify'],
    );
  }
}

export async function verifyDiscordRequest(request, env) {
  const signature = request.headers.get('x-signature-ed25519');
  const timestamp = request.headers.get('x-signature-timestamp');
  const body = await request.text();

  if (!signature || !timestamp || !env.DISCORD_PUBLIC_KEY) {
    return { isValid: false };
  }

  try {
    const key = await importPublicKey(env.DISCORD_PUBLIC_KEY);
    const algorithm = key.algorithm.name === 'Ed25519' ? 'Ed25519' : 'NODE-ED25519';
    const isValid = await crypto.subtle.verify(
      algorithm,
      key,
      hexToBytes(signature),
      new TextEncoder().encode(timestamp + body),
    );
    return { isValid, interaction: isValid ? JSON.parse(body) : null };
  } catch {
    return { isValid: false };
  }
}
