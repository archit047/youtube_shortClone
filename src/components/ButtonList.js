import React from "react";
import Button from "../components/Button";

const list = ["All","Gaming","Songs","Live","Soccer","Cricket","Cooking","Hockey","Valentines"];
const ButtonList=()=>{
    return (
        <div className="flex">
            {/* <Button name="All"/>
            <Button name="Gaming"/>
            <Button name="Songs"/>
            <Button name="Live"/>
            <Button name="Soccer"/>
            <Button name="Cricket"/>
            <Button name="Cooking"/>
            <Button name="Hockey"/>
            <Button name="Valentines"/> */}
            {
                list.map((youtubeElements,index)=><Button key={index} name={youtubeElements}/>)
            }
        </div>
    );
};

export default ButtonList;