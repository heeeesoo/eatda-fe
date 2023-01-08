import { useRouter } from "next/router";
import FooterButton from "../../../components/common/FooterButton";
import Navigation from "../../../components/common/Navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import colors from "../../../../styles";
import ProcessCard from "../../../components/recipe/ProcessCard";

interface ProcessType {
  num: number;
  ingredients: string[];
  text: string;
  splitted?: string[];
}
interface Recipe {
  title: string;
  process: ProcessType[];
}
type CardProps = string | ProcessType;
const IngredientData = [
  { name: "쌀가루", amount: "2큰 술" },
  { name: "달걀", amount: "2큰 술" },
  { name: "우유", amount: "2큰 술" },
  { name: "설탕", amount: "2큰 술" },
  { name: "베이킹파우더", amount: "2큰 술" },
  { name: "천도복숭아", amount: "2큰 술" },
  { name: "요구르트", amount: "2큰 술" },
  { name: "청포도", amount: "2큰 술" },
];
const RecipeData: Recipe[] = [
  {
    title: "쌀가루 팬케이크",
    process: [
      {
        num: 1,
        ingredients: ["쌀가루", "달걀", "우유", "설탕", "베이킹파우더"],
        text: "볼에 쌀가루, 달걀, 우유, 설탕, 베이킹파우더를 넣고 덩어리지지 않게 잘 섞는다.",
      },
      {
        num: 2,
        ingredients: [],
        text: "팬에 식용유를 살짝 두르고 키친타월로 닦아낸 뒤 팬케이크 반죽을 떠 넣어 굽는다.",
      },
      {
        num: 3,
        ingredients: [],
        text: "반죽의 테두리 부분이 익어갈 때쯤 뒤집어 앞뒤로 노릇노릇하게 굽는다.",
      },
    ],
  },
  {
    title: "치아시드 과일요거트",
    process: [
      {
        num: 1,
        ingredients: ["천도복숭아", "청포도"],
        text: "천도복숭아는 꺠끗이 씻어 적당한 크기로 썰고, 청포도는 알알이 떼어 깨끗하게 씻는다",
      },
      {
        num: 2,
        ingredients: ["요구르트", "치아시드", "청포도", "천도복숭아"],
        text: "그릇에 요구르트와 치아시드를 담고 청포도와 천도복숭아를 올린다.",
      },
    ],
  },
];

const CardData: CardProps[] = [];

// 레시피 과정 데이터에서 재료에 해당하는 단어 뽑아서 카드 데이터 넣기
RecipeData.forEach((menu) => {
  CardData.push(menu.title);

  menu.process.forEach((step) => {
    // 재료 단어들로 정규식 만들기
    let regex_str = "";
    step.ingredients.forEach((ingredient) => {
      regex_str = regex_str + ingredient + "|";
    });
    regex_str = regex_str.slice(0, -1);
    const regex = new RegExp(regex_str);

    step.splitted = step.text.split(regex);

    CardData.push(step);
  });
});

export default function Process() {
  const router = useRouter();
  const [curCard, setCurCard] = useState(0);

  return (
    <>
      <div>
        <Navigation text="상세정보" />
        <div className="container">
          <Slider
            vertical={true}
            verticalSwiping={true}
            slidesToShow={4}
            infinite={false}
            arrows={false}
            focusOnSelect={true}
            swipeToSlide={true}
            beforeChange={(slide, newSlide) => {
              setCurCard(newSlide);
            }}
          >
            {CardData.map((content, idx) => (
              <div key={idx}>
                <ProcessCard content={content} selected={curCard == idx} />
              </div>
            ))}
            <div className="blank">1</div>
            <div className="blank">2</div>
            <div className="blank">3</div>
          </Slider>
        </div>
        <FooterButton text="요리 완료하기" path="/" />
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          gap: 8px;
          justify-content: center;
          margin-top: 60px;
          overflow: hidden;
          width: 390px;
        }
        .blank {
          opacity: 0;
        }
      `}</style>
    </>
  );
}