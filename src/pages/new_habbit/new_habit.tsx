import { Dropdown } from "@/components/communs/dropdown";
import { Input } from "@/components/communs/input";
import { Title } from "@/components/communs/title";
import { Date } from "@/components/communs/date";
import Head from "next/head";
import Link from "next/link";

export default function New_habbit() {


  
  return (
    <>
      <Head>
        <title>Daily Habits</title>
      </Head>
      <div className="main-container">
        <div className="content-container">
          <Title>New Habbit</Title>
          <div>
            <form>
              <div className="form-container">
                <Input label={"Name"} placehloder={"Put a habbit name here"}/>
                
                <Input label={"Description"} placehloder={"Put a description here"}/>
                                
                <label htmlFor="icon">Habbit icons</label>
                <input type="text" id="habitName" name="habitName"/>
                
                <Date label={"Date"} placeholder={"dd/mm/yyyy"} placeholder2={"End Time"}/>

                <label htmlFor="date">Date</label>
                <input type="text" id="habitName" name="habitName"/>
                <input type="text" id="habitName" name="habitName"/>
                

                <Dropdown label={"Repeat"} options={["During a Week","During a Day","Never"]}/>
              
                <Dropdown label={"Notification"} options={["Yes","No"]}/>


              </div>
              <button type="submit"> X Cancel</button>
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
