import ukFlag from "public/images/flags/english_flag.png";
import spainFlag from "public/images/flags/spanish_flag.png";
import franceFlag from "public/images/flags/french_flag.png";
import italianFlag from "public/images/flags/italian_flag.png";
import germanFlag from "public/images/flags/german_flag.png";
import japaneseFlag from "public/images/flags/japanese_flag.png";

const languagesList: any = {
  english: {
    flagUrl: ukFlag,
    displayName: "English",
  },
  spanish: {
    flagUrl: spainFlag,
    displayName: "Spanish",
  },
  german: { flagUrl: germanFlag, displayName: "German" },
  italian: { flagUrl: italianFlag, displayName: "Italian" },
  japanese: { flagUrl: japaneseFlag, displayName: "Japanese" },
  french: { flagUrl: franceFlag, displayName: "French" },
};

export default languagesList;
