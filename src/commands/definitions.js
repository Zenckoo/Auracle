// The list of slash commands Discord shows to users.
// After changing this file, open the /register link again so Discord learns the new list.

export const commands = [
  {
    name: 'awaken',
    description: 'Begin your trial and discover your class',
    type: 1,
    contexts: [0],
  },
  {
    name: 'profile',
    description: "View your profile card, or a traveler's with @member",
    type: 1,
    contexts: [0],
    options: [
      {
        type: 6,
        name: 'member',
        description: 'The traveler whose card you want to see',
        required: false,
      },
    ],
  },
  {
    name: 'help',
    description: "Open the Traveler's Guide",
    type: 1,
    contexts: [0],
  },
];
