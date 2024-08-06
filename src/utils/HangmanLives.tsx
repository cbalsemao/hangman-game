import img0 from "../assets/img-hangman1.png";
import img1 from "../assets/img-hangman2.png";
import img2 from "../assets/img-hangman3.png";
import img3 from "../assets/img-hangman4.png";
import img4 from "../assets/img-hangman5.png";
import img5 from "../assets/img-hangman6.png";
import img6 from "../assets/img-hangman7.png";

export type HangmanLivesType = {
  key: number;
  image: string | JSX.Element;
};

export const hangmanLives = [
  { key: 0, image: <img src={img6} width="200" height="200" /> },
  { key: 1, image: <img src={img6} width="200" height="200" /> },
  { key: 2, image: <img src={img5} width="200" height="200" /> },
  { key: 3, image: <img src={img4} width="200" height="200" /> },
  { key: 4, image: <img src={img3} width="200" height="200" /> },
  { key: 5, image: <img src={img2} width="200" height="200" /> },
  {
    key: 6,
    image: <img src={img1} width="200" height="200" />,
  },
  {
    key: 7,
    image: <img src={img0} width="200" height="200" />,
  },
];
