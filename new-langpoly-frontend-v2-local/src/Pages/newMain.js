import React  from "react";
import WebTable from "src/Component/table";
import Header from '../Component/header';
import {ToastContainer} from 'react-toastify';
import english from 'src/helpers/locales/eng.json';
import thailand from 'src/helpers/locales/thai.json';

const LanguageContext = React.createContext()


const TestPage = () => {
  const allMessages = {
		en: english,
		th: thailand
	}

  const [lng, setLng] = React.useState('en');
	const [msg, setMsg] = React.useState(allMessages['en']);

	const changeLanguage = (language) => {
		setLng(language);
		setMsg(allMessages[language])
	}

  return (
    <>
      <ToastContainer />
      <LanguageContext.Provider value={{lng, msg, changeLanguage}}>
        <Header/>
        <WebTable />
      </LanguageContext.Provider>
    </>
  );
};

export default TestPage;
export {LanguageContext}