import { Dropdown } from "@/components/communs/dropdown";
import { Input } from "@/components/communs/input";
import { Title } from "@/components/communs/title";
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
                
                <Input label={"Description"} placehloder={"Put a habbit description here"}/>
                                
                <label htmlFor="icon">Habbit icons</label>
                <input type="text" id="habitName" name="habitName"/>
                
                <label htmlFor="date">Date</label>
                <input type="text" id="habitName" name="habitName"/>
                <input type="text" id="habitName" name="habitName"/>
                
                <label htmlFor="hour">Hour</label>
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
