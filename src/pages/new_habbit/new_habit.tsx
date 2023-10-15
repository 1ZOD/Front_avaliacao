import { Dropdown } from "@/components/communs/dropdown";
import { Input } from "@/components/communs/input";
import { Title } from "@/components/communs/title";
import { Date } from "@/components/communs/date";
import Head from "next/head";
import Link from "next/link";
import { Time } from "@/components/communs/time";
import IconField from "@/components/communs/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

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
                                
                <IconField label={"Habbit Icons"}/>
                
                <Date label={"Date"} placeholder={"dd/mm/yyyy"} placeholder2={"End Time"}/>

                <Time label={"Hour"} placeholder={"hh:mm"} placeholder2={"End Time"}/>
                

                <Dropdown label={"Repeat"} options={["During a Week","During a Day","Never"]}/>
              
                <Dropdown label={"Notification"} options={["Yes","No"]}/>

                <div className="container_button">
                    <button className="cancel_button" type="submit"> X Cancel</button>
                    <button className="submit_button" type="submit">
                      <FontAwesomeIcon icon={faCheck} size="sm" style={{ color: '#000000' }}/>
                      Save
                      </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
