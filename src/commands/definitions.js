// The slash commands Discord shows to members.
// contexts: [0] means the command only works inside a server.

export const commandDefinitions = [
  {
    name: 'awaken',
    description: 'Begin your trial and discover your class',
    type: 1,
    contexts: [0],
  },
  {
    name: 'help',
    description: "Open the Traveler's Guide",
    type: 1,
    contexts: [0],
  },
];
