import React, { useState,  useRef } from 'react';
import axios from 'axios';
import PasswordPopup from './PasswordPopup';
import { useNavigate } from 'react-router-dom';
import heartEmoji from '../assets/heartemoji.png';
import LoadingTroll from '../assets/LoadingTroll.gif';
import doublefleche from '../assets/double-fleche.png';
import FireEmoji from '../assets/FireEmoji.png';
import audioFile from "../assets/output_Manuel.mp3";

const adressBackend = "https://sheltered-cove-94091-9084cf6c4c08.herokuapp.com"
//const adressBackend = "http://localhost:5000"


export default function NewHome(){
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const bottomRef = useRef(null);
  const topRef = useRef(null);
  var top = true;
  const navigate = useNavigate();
  const [StoryType, setStoryType] = useState('');

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleButtonClickRomantique = () => {
    setIsPopupVisible(true);
    setStoryType('romantique')
  };

  const handleButtonClickSauvage = () => {
    setIsPopupVisible(true);
    setStoryType('sauvage')
  };

  const enterAlexStorie = () => {
    const url =  audioFile
    const texte = "Lorem ipsum dolor \n sit amet, consectetur adipiscing elit. Curabitur tristique nunc sed turpis feugiat, ac elementum mauris auctor. Phasellus congue mauris vitae velit ultricies, quis pharetra\n neque rhoncus. Fusce gravida blandit commodo. Vestibulum euismod scelerisque facilisis. Suspendisse fringilla ullamcorper massa a facilisis. Etiam sit amet nunc et ipsum tristique hendrerit. Donec rutrum placerat lacus. Duis sodales, nisl id aliquet gravida, nisl magna euismod orci, et venenatis nisl libero quis libero.\n Integer eu metus eget elit luctus dictum ut at dolor. Aenean facilisis, ligula at placerat imperdiet, turpis nulla accumsan mi, ut venenatis arcu sem vel arcu. Aliquam egestas est a dolor interdum, ac pharetra sapien maximus. Vestibulum suscipit velit et augue pulvinar, semper dignissim dolor gravida. Vestibulum eu iaculis mi.\n Nullam lacinia est at lectus volutpat aliquet. Maecenas mattis, augue non molestie mollis, purus dolor porta felis, a rutrum ante arcu sit amet nisl.";
    navigate('/mystory', { state: { Text: texte, audioUrl: url }, });
  };

  const enterCharleStorie = () => {
    const url =  audioFile
    const texte = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tristique nunc sed turpis feugiat, ac elementum mauris auctor. Phasellus congue mauris vitae velit ultricies, quis pharetra neque rhoncus. Fusce gravida blandit commodo. Vestibulum euismod scelerisque facilisis. Suspendisse fringilla ullamcorper massa a facilisis. Etiam sit amet nunc et ipsum tristique hendrerit. Donec rutrum placerat lacus. Duis sodales, nisl id aliquet gravida, nisl magna euismod orci, et venenatis nisl libero quis libero. Integer eu metus eget elit luctus dictum ut at dolor. Aenean facilisis, ligula at placerat imperdiet, turpis nulla accumsan mi, ut venenatis arcu sem vel arcu. Aliquam egestas est a dolor interdum, ac pharetra sapien maximus. Vestibulum suscipit velit et augue pulvinar, semper dignissim dolor gravida. Vestibulum eu iaculis mi. Nullam lacinia est at lectus volutpat aliquet. Maecenas mattis, augue non molestie mollis, purus dolor porta felis, a rutrum ante arcu sit amet nisl.";
    navigate('/mystory', { state: { Text: texte, audioUrl: url }, });
};

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleSubmitPassword =  async (password) => {
    try {
      const response = await axios.post(adressBackend + '/check_password',  {password} );
      if (response.data.success) {
        alert('Correct password.');
        // Appelez votre fonction ici
        setIsPopupVisible(false);
        if(StoryType === 'romantique'){
          enterRomantic();
        }
        if(StoryType === 'sauvage'){
          enterHot();
        }
      } else {
        alert('Incorrect password.');
      }
    } catch (error) {
      console.error('There was an error!', error);
      alert('There was an error with the request.');
    }
    setIsPopupVisible(false);
  };

  async function  enterRomantic () {
        document.documentElement.style.setProperty('--main-color', 'linear-gradient(90deg,#fff7ad, #ffa9f9)');
        document.documentElement.style.setProperty('--font-color', '#007CC4');
        
      setLoading(true)
      
      //Vérifier paramètre NAME DESCRITPION ET LIEU 
      const storyData = {
          nom: name,
          description: description,
          lieu: location
      };

      try {
        console.log('Envoi de la requête au serveur...');
        const response = await axios.post(adressBackend + '/generate_romantique', storyData);
        //await axios.post('https://sheltered-cove-94091.herokuapp.com/generate_audio', {texte: response.data.texte}); 
        //navigation.navigate('MyStory' , {Text: response.data.texte});
        //const text = `Dans la lumière dorée du coucher de soleil, je me tenais au sommet de la Tour Eiffel, admirant la vue imprenable sur Paris. Soudain, j'ai senti une présence derrière moi. Je me suis retournée et j'ai été frappée par la vue de Manuel Ferrara, un homme français grand et musclé, aux cheveux bruns et aux yeux perçants. Son regard intense m'a fait frissonner, et j'ai senti une attraction immédiate. Manuel s'est approché lentement,
        // son sourire charmant révélant des fossettes séduisantes. Ses yeux ne quittaient pas les miens, et j'ai senti mon cœur battre de plus en plus fort. Il a levé la main et a doucement effleuré ma joue, son toucher électrisant faisant naître une étincelle entre nous. Je pouvais sentir son désir, aussi ardent que le mien. Nos lèvres se sont rencontrées dans un baiser passionné, gourmand et plein de promesses. Ses mains ont commencé à explorer mon corps, ses doigts habiles me faisant frissonner de plaisir. Je pouvais sentir son excitation, son désir pour moi, et cela n'a fait qu'attiser le mien. Manuel a commencé à me déshabiller lentement, ses yeux ne quittant pas les miens.
        //  Chaque morceau de vêtement qui tombait dévoilait un peu plus ma peau, et je pouvais voir le désir brûler dans ses yeux. Sa respiration est devenue plus rapide, plus profonde, et je pouvais sentir son corps réagir à chaque caresse. Nos corps nus se sont enlacés, et nous avons commencé à explorer l'autre de manière plus intime. Manuel était un amant attentionné, répondant à chaque gémissement, à chaque frisson avec une précision experte. Ses mains, sa bouche, son corps tout entier semblait connaître mes désirs avant même que je ne les exprime. Le corps à corps était passionné, nos corps s'emboîtant parfaitement. Manuel variait l'intensité de ses caresses, me laissant toujours au bord de l'orgasme, mais jamais assez pour que je bascule. Son contrôle était impressionnant, et cela ne faisait qu'augmenter mon désir pour lui. Je pouvais sentir son désir, son excitation, et j'ai décidé que c'était le moment. J'ai guidé Manuel en moi, et nous avons tous les deux gémis de plaisir. La connexion entre nous était profonde, intense, et je pouvais sentir chaque partie de mon corps réagir à lui. Manuel cherchait à me combler, à me donner du plaisir, et je me suis abandonnée à lui, à son toucher, à son amour. Le rapport était intense, passionné, et je pouvais sentir l'orgasme monter en moi. Manuel a continué à me stimuler, à me faire monter, jusqu'à ce que je bascule finalement, un cri de plaisir s'échappant de mes lèvres. Manuel a suivi peu après, son corps se tendant et se détendant dans mes bras. Après, nous sommes restés enlacés, nos corps nus et transpirants se collant l'un à l'autre. La tension a doucement décru, remplacée par une vague d'apaisement et de satisfaction. Nous sommes restés ainsi, profitant de la connexion profonde que nous avions partagée, jusqu'à ce que le soleil se couche et que les lumières de Paris s'allument, éclairant notre amour.`
        //const responseaudio = await axios.post(adressBackend + '/generate_audio', {texte: response.data.texte}, {
        //  responseType: 'blob', // Important pour recevoir un fichier blob
        //});
        const texteGenere = response.data.texte;

        // Appel pour obtenir le flux audio en continu
        const audioUrl = `${adressBackend}/generate_audio?texte=${encodeURIComponent(texteGenere)}`;

        navigate('/mystory', { state: { Text: texteGenere, audioUrl: audioUrl } });

        //const url = URL.createObjectURL(responseaudio.data);
        
        //navigate('/mystory', { state: { Text: response.data.texte, audioUrl: url }, });
        //console.log('Réponse reçue du serveur:', response.data);
        //const story
        //console.log(response.data.texte);
        //console.log(storyText);
        //PEUT ETRE VERIFIER LA SORTIE DE LA REQUETE ? 
        //setStory(storyText);
      } catch (error) {
        console.error('Erreur', error);
      }
      setLoading(false)
      };
     const enterHot = async () => {
        document.documentElement.style.setProperty('--main-color', 'linear-gradient(90deg,#ff3131, #ff914d)');
        document.documentElement.style.setProperty('--font-color', '#9f0000');
        setLoading(true)
        //Vérifier paramètre NAME DESCRITPION ET LIEU 
        const storyData = {
            nom: name,
            description: description,
            lieu: location
        };

        try {
          console.log('Envoi de la requête au serveur...');
          const response = await axios.post(adressBackend + '/generate_sauvage', storyData);
          //await axios.post('https://sheltered-cove-94091.herokuapp.com/generate_audio', {texte: response.data.texte}); 
          //navigation.navigate('MyStory' , {Text: response.data.texte});
          //const text = `Dans la lumière dorée du coucher de soleil, je me tenais au sommet de la Tour Eiffel, admirant la vue imprenable sur Paris. Soudain, j'ai senti une présence derrière moi. Je me suis retournée et j'ai été frappée par la vue de Manuel Ferrara, un homme français grand et musclé, aux cheveux bruns et aux yeux perçants. Son regard intense m'a fait frissonner, et j'ai senti une attraction immédiate. Manuel s'est approché lentement,
          // son sourire charmant révélant des fossettes séduisantes. Ses yeux ne quittaient pas les miens, et j'ai senti mon cœur battre de plus en plus fort. Il a levé la main et a doucement effleuré ma joue, son toucher électrisant faisant naître une étincelle entre nous. Je pouvais sentir son désir, aussi ardent que le mien. Nos lèvres se sont rencontrées dans un baiser passionné, gourmand et plein de promesses. Ses mains ont commencé à explorer mon corps, ses doigts habiles me faisant frissonner de plaisir. Je pouvais sentir son excitation, son désir pour moi, et cela n'a fait qu'attiser le mien. Manuel a commencé à me déshabiller lentement, ses yeux ne quittant pas les miens.
          //  Chaque morceau de vêtement qui tombait dévoilait un peu plus ma peau, et je pouvais voir le désir brûler dans ses yeux. Sa respiration est devenue plus rapide, plus profonde, et je pouvais sentir son corps réagir à chaque caresse. Nos corps nus se sont enlacés, et nous avons commencé à explorer l'autre de manière plus intime. Manuel était un amant attentionné, répondant à chaque gémissement, à chaque frisson avec une précision experte. Ses mains, sa bouche, son corps tout entier semblait connaître mes désirs avant même que je ne les exprime. Le corps à corps était passionné, nos corps s'emboîtant parfaitement. Manuel variait l'intensité de ses caresses, me laissant toujours au bord de l'orgasme, mais jamais assez pour que je bascule. Son contrôle était impressionnant, et cela ne faisait qu'augmenter mon désir pour lui. Je pouvais sentir son désir, son excitation, et j'ai décidé que c'était le moment. J'ai guidé Manuel en moi, et nous avons tous les deux gémis de plaisir. La connexion entre nous était profonde, intense, et je pouvais sentir chaque partie de mon corps réagir à lui. Manuel cherchait à me combler, à me donner du plaisir, et je me suis abandonnée à lui, à son toucher, à son amour. Le rapport était intense, passionné, et je pouvais sentir l'orgasme monter en moi. Manuel a continué à me stimuler, à me faire monter, jusqu'à ce que je bascule finalement, un cri de plaisir s'échappant de mes lèvres. Manuel a suivi peu après, son corps se tendant et se détendant dans mes bras. Après, nous sommes restés enlacés, nos corps nus et transpirants se collant l'un à l'autre. La tension a doucement décru, remplacée par une vague d'apaisement et de satisfaction. Nous sommes restés ainsi, profitant de la connexion profonde que nous avions partagée, jusqu'à ce que le soleil se couche et que les lumières de Paris s'allument, éclairant notre amour.`
          const texteGenere = response.data.texte;

          // Appel pour obtenir le flux audio en continu
          const audioUrl = `${adressBackend}/generate_audio?texte=${encodeURIComponent(texteGenere)}`;

          navigate('/mystory', { state: { Text: texteGenere, audioUrl: audioUrl } });
          //console.log('Réponse reçue du serveur:', response.data);
          //const story
          //console.log(response.data.texte);
          //console.log(storyText);
          //PEUT ETRE VERIFIER LA SORTIE DE LA REQUETE ? 
          //setStory(storyText);
        } catch (error) {
          console.error('Erreur', error);
        }
        setLoading(false)
      };

    const scrollToBottom = () => {
      if(top){
        top = false;
        if (bottomRef.current) {
          bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        top = true;
        if (topRef.current) {
          topRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

      if(loading){
        return(
          <div className="FrontPage">
            <h1 className="title">SayMyStory</h1>
            <p className="subtitle">Nous te préparons la meilleure histoire de ta vie... </p>
            <br></br>
            <p className="subtitle">Tu ferais mieux de mettre tes écouteurs</p>
            <img src={LoadingTroll} height={100} width={100}></img>
          </div>
        )
      }
      
    
      return (
        <div className="story-container">
          <div className="form-container">
          <div ref={topRef}></div>
              <h1 className="story-title">SayMyStory</h1>
              <p className="story-subtitle">Crée l'histoire de tes rêves :</p>
              <form className="story-form">
                <label className="story-label">
                  Quel est ton partenaire ? Fais parler tes envies
                  <input className="story-input" type="text" placeholder="Ex : Jackson Wang, Charles Leclerc, InoxTag" onChange={e => setName(e.target.value)} />
                </label>
                <label className="story-label">
                  Si ton partenaire n'est pas quelqu'un de connu, décris le nous physiquement !
                  <input className="story-input" type="text" placeholder="Ex : Grand, yeux bleus, blond"  onChange={e => setDescription(e.target.value)}/>
                </label>
                <label className="story-label">
                  On fait ça où ? Tout est possible, n'hésite pas
                  <input className="story-input" type="text" placeholder="Ex : une salle de classe, le Four Seasons de Miami, un hammam" onChange={e => setLocation(e.target.value)}/>
                </label>
                <div className="story-button-group">
                  <button type="button" onClick={handleButtonClickRomantique} className="story-romantic-button">
                  <img src={heartEmoji} height={35} width={35}></img>
                    Je veux une histoire romantique
                  </button>
                  {isPopupVisible && (
                    <PasswordPopup
                      onClose={handleClosePopup}
                      onSubmit={handleSubmitPassword}
                    />
                  )}
                  <button type="button" onClick={handleButtonClickSauvage}  className="story-hot-button">
                  <img src={FireEmoji} height={35} width={35}></img>
                    Je veux une histoire torride
                  </button>
                </div>
              </form>
              <div className='doubleFleche'>
              <img src={doublefleche} height={50} width={60} onClick={scrollToBottom}></img>
              </div>
              <div className="exampleStory">
                  <div className='TypeStory'>
                    <h3>Histoire de Alex</h3>
                    <button type="button" onClick={enterAlexStorie} className='AlexStory'>

                    </button>
                  </div>
                  <div className='TypeStory'>
                  <h3>Histoire de Charles</h3>
                    <button type="button" onClick={enterCharleStorie} className='AlexStory'>

                    </button>
                  </div>
              </div>
              <div ref={bottomRef}></div>
            </div>
        </div>
      );
}