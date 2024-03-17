interface Gnome {
  emotion: string;
  gif: {
    eat: {
      [key: string]: string;
    };
    dance: string;
    meditate: string;
    smoke: string;
  };
}

const gnomesMetadata: Gnome[] = [
  {
    emotion: "happy",
    gif: {
      eat: {
        mushroom: "https://example.com/mushroom.gif",
        rice: "https://example.com/rice.gif",
        peas: "https://example.com/peas.gif",
      },
      dance: "https://example.com/dance.gif",
      meditate: "https://example.com/meditate.gif",
      smoke: "https://example.com/smoke.gif",
    },
  },
  {
    emotion: "sad",
    gif: {
      eat: {
        mushroom: "https://example.com/sad-mushroom.gif",
        rice: "https://example.com/sad-rice.gif",
        peas: "https://example.com/sad-peas.gif",
      },
      dance: "https://example.com/sad-dance.gif",
      meditate: "https://example.com/sad-meditate.gif",
      smoke: "https://example.com/sad-smoke.gif",
    },
  },
  // Add more gnome metadata entries as needed
];

export default gnomesMetadata;
