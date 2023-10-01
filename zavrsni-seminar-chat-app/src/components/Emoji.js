const emojis = ["&#x1F600;", "&#x1F601;", "&#x1F602;", "&#x1F603;", "&#x1F604;", "&#x1F605;", "&#x1F606;",
    "&#x1F607;", "&#x1F608;", "&#x1F609;", "&#x1F60A;","&#x1F60B;","&#x1F60C;", "&#x1F60D;", "&#x1F60E;",
    "&#x1F60F;", "&#x1F610;", "&#x1F611;", "&#x1F612;", "&#x1F613;", "&#x1F614;", "&#x1F615;", "&#x1F616;",
    "&#x1F617;", "&#x1F618;", "&#x1F619;", "&#x1F61A;", "&#x1F61B;", "&#x1F61C;", "&#x1F61D;", "&#x1F61E;",
    "&#x1F61F;", "&#x1F620;", "&#x1F621;", "&#x1F622;", "&#x1F623;", "&#x1F624;", "&#x1F625;", "&#x1F626;", 
    "&#x1F627;", "&#x1F628;", "&#x1F629;","&#x1F62A;","&#x1F62B;","&#x1F62C;","&#x1F62D;","&#x1F62E;",
    "&#x1F62F;", "&#x1F630;", "&#x1F631;", "&#x1F632;", "&#x1F633;", "&#x1F634;", "&#x1F635;", "&#x1F636;", 
    "&#x1F637;", "&#x1F638;", "&#x1F639;", "&#x1F63A;", "&#x1F63B;", "&#x1F63C;", "&#x1F63D;", "&#x1F63E;", 
    "&#x1F63F;", "&#x1F640;", "&#x1F641;", "&#x1F642;", "&#x1F643;", "&#x1F644;", "&#x1F32D;", "&#x1F32E;", 
    "&#x1F32F;", "&#x1F330;", "&#x1F331;", "&#x1F332;", "&#x1F333;", "&#x1F334;", "&#x1F335;", "&#x1F336;", 
    "&#x1F337;", "&#x1F338;", "&#x1F339;", "&#x1F33A;", "&#x1F33B;", "&#x1F33C;", "&#x1F33D;", "&#x1F33E;", 
    "&#x1F33F;", "&#x1F340;", "&#x1F341;", "&#x1F342;", "&#x1F343;", "&#x1F344;", "&#x1F345;", "&#x1F346;", 
    "&#x1F347;" 
   ];
  
   export default function Emoji({ onClick }) {
    function createMarkup(emoji) {
      return { __html: emoji };
    }
  
    const emoji_style = {
      display: "none"
    };
  
    return (
      <ul className="emoji-list" style={emoji_style}>
        {emojis.map((emoji, index) => (
          <li key={index}>
            <span
              role="img"
              aria-label={emoji}
              onClick={onClick}
              dangerouslySetInnerHTML={createMarkup(emoji)}
            ></span>
          </li>
        ))}
      </ul>
    );
  }