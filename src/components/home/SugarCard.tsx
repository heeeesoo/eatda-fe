import colors from "../../../styles";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/tokenSlice";
import { Post, Delete } from "../../hooks/Fetch";

interface SugarCardProps {
  is_exist?: boolean;
  timeline?: number;
  value?: number;
  time?: string;

  is_me_liked?: boolean;
  who_liked?: [];
}

export default function SugarCard({ is_exist, timeline, value, time, is_me_liked, who_liked }: SugarCardProps) {
  const [like, setLike] = useState<boolean | undefined>(()=>is_me_liked);
  const token = useSelector(selectToken);
  const mealType = () => {
    switch (timeline) {
      case 0:
        return "아침";
      case 1:
        return "점심";
      case 2:
        return "저녁";
      default:
        return "오류";
    }
  };

  const handleClick = (e:React.MouseEvent<HTMLImageElement>) => {
    async function fetchData(method: String){
      const requestBody = {
        "target": 1,
        "timeline": timeline
      }
      if(method === 'POST'){
        const {data, res} : any = await Post({
          url: 'users/home/like/', 
          token: token.access_token, 
          requestBody: requestBody
        });
      }else if(method === 'DELETE'){
        const {data, res} : any = await Delete({
          url: 'users/home/like/', 
          token: token.access_token, 
          requestBody: requestBody
        });
      }
    }
    if(like){
      fetchData('DELETE');
      // console.log('Delete');
    }else{
      fetchData('POST');
      // console.log('post')
    }
    setLike(!like);
  }

  return (
    <div className="container">
    {
      is_exist ?
        <div className="card">
          <div className="textValue">
          <Image alt="character" width={16} height={16} src={`/img/todayValue.svg`} priority/>
          &nbsp;
          {value}mg/dl
          </div>
          <div className="textTime">
          <Image alt="character" width={16} height={16} src={`/img/todayTime.svg`} priority/>
          &nbsp;
          {time} 측정
          </div>
          <div className="imageStyle">
          <div className="textType">
          {mealType()}
          </div>
          <Image 
          onClick={handleClick}
          alt="character" 
          width={32} height={32} 
          src={like? `/button/like_full.svg` : `/button/like_empty.svg`} 
          priority/>
          </div>
        </div>
      :
      <div className="cardEmptyOut">
        <div className="cardEmptyIn">
          + <br/>
          혈당 기록하러 가기
        </div>
        </div>
    }
      <style jsx>{`
        .container {
            display: flex;
            justify-content: center;
        }
        .card {
          width: 350px;
          height: 108px;
          padding-top: 8px;
          padding-left: 12px;
          paddig-right: 12px;
          padding: 12px;
          box-sizing: border-box;
          background-color: white;
          border-radius: 4px;
          border: 1px solid ${colors.grayBackgroundSub};
        }
        .cardEmptyOut {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 350px;
          height: 108px;
          border: 1px solid ${colors.grayBackgroundSub};
          background-color: white;
          border-radius: 4px;
        }
        .cardEmptyIn {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: ${colors.graySubTitle2};
          font-size: 14px;
        }
        .data {
          display: flex;
          flex-direction: column;
        }

        .textTime{
          display: flex;
          align-items: center;
          margin-right: auto;
          margin-top: 8px;
          margin-bottom: 2px;
          color: ${colors.graySubTitle};
          font-size: 14px;
        }
        .textValue{
          display: flex;
          align-items: center;
          margin-right: auto;
          font-size: 24px;
          font-weight: 600;
        }
        .textType{
          text-align: center;
          line-height: 24px;
          margin-right: auto;
          // margin-left: 12px;
          width: 44px;
          height: 24px;
          background: ${colors.mainOrange};
          color: ${colors.grayWhite};
          font-size: 12px;
          border-radius: 4px;
        }
        .imageStyle {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
