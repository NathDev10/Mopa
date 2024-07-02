import React, { useState,  useRef } from 'react';
import axios from 'axios';
import PasswordPopup from './PasswordPopup';
import { useNavigate } from 'react-router-dom';
import heartEmoji from '../assets/heartemoji.png';
import LoadingTroll from '../assets/LoadingTroll.gif';
import doublefleche from '../assets/double-fleche.png';
import FireEmoji from '../assets/FireEmoji.png';




export default function NewHome(){
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const bottomRef = useRef(null);
  const topRef = useRef(null);
  var top = true;
  const navigate = useNavigate();

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const correctPassword = 'zizi'; // Remplacez par le mot de passe correct

  const handleButtonClick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleSubmitPassword = (password) => {
    if (password === correctPassword) {
      // Appelez votre fonction ici
      setIsPopupVisible(false);
      enterRomantic();
    } else {
      alert('Incorrect password.');
    }
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
        //const response = await axios.post('http://localhost:5000/generate', storyData);
        //await axios.post('http://localhost:5000/generate_audio', {texte: response.data.texte}); 
        //navigation.navigate('MyStory' , {Text: response.data.texte});
        const text = `Dans la lumière dorée du coucher de soleil, je me tenais au sommet de la Tour Eiffel, admirant la vue imprenable sur Paris. Soudain, j'ai senti une présence derrière moi. Je me suis retournée et j'ai été frappée par la vue de Manuel Ferrara, un homme français grand et musclé, aux cheveux bruns et aux yeux perçants. Son regard intense m'a fait frissonner, et j'ai senti une attraction immédiate. Manuel s'est approché lentement,
         son sourire charmant révélant des fossettes séduisantes. Ses yeux ne quittaient pas les miens, et j'ai senti mon cœur battre de plus en plus fort. Il a levé la main et a doucement effleuré ma joue, son toucher électrisant faisant naître une étincelle entre nous. Je pouvais sentir son désir, aussi ardent que le mien. Nos lèvres se sont rencontrées dans un baiser passionné, gourmand et plein de promesses. Ses mains ont commencé à explorer mon corps, ses doigts habiles me faisant frissonner de plaisir. Je pouvais sentir son excitation, son désir pour moi, et cela n'a fait qu'attiser le mien. Manuel a commencé à me déshabiller lentement, ses yeux ne quittant pas les miens.
          Chaque morceau de vêtement qui tombait dévoilait un peu plus ma peau, et je pouvais voir le désir brûler dans ses yeux. Sa respiration est devenue plus rapide, plus profonde, et je pouvais sentir son corps réagir à chaque caresse. Nos corps nus se sont enlacés, et nous avons commencé à explorer l'autre de manière plus intime. Manuel était un amant attentionné, répondant à chaque gémissement, à chaque frisson avec une précision experte. Ses mains, sa bouche, son corps tout entier semblait connaître mes désirs avant même que je ne les exprime. Le corps à corps était passionné, nos corps s'emboîtant parfaitement. Manuel variait l'intensité de ses caresses, me laissant toujours au bord de l'orgasme, mais jamais assez pour que je bascule. Son contrôle était impressionnant, et cela ne faisait qu'augmenter mon désir pour lui. Je pouvais sentir son désir, son excitation, et j'ai décidé que c'était le moment. J'ai guidé Manuel en moi, et nous avons tous les deux gémis de plaisir. La connexion entre nous était profonde, intense, et je pouvais sentir chaque partie de mon corps réagir à lui. Manuel cherchait à me combler, à me donner du plaisir, et je me suis abandonnée à lui, à son toucher, à son amour. Le rapport était intense, passionné, et je pouvais sentir l'orgasme monter en moi. Manuel a continué à me stimuler, à me faire monter, jusqu'à ce que je bascule finalement, un cri de plaisir s'échappant de mes lèvres. Manuel a suivi peu après, son corps se tendant et se détendant dans mes bras. Après, nous sommes restés enlacés, nos corps nus et transpirants se collant l'un à l'autre. La tension a doucement décru, remplacée par une vague d'apaisement et de satisfaction. Nous sommes restés ainsi, profitant de la connexion profonde que nous avions partagée, jusqu'à ce que le soleil se couche et que les lumières de Paris s'allument, éclairant notre amour.`
        navigate('/mystory', { state: { Text: text } });
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
     const enterHot = () => {
    //     document.documentElement.style.setProperty('--main-color', 'linear-gradient(90deg,#ff3131, #ff914d)');
    //     document.documentElement.style.setProperty('--font-color', '#9f0000');
    //     TODO
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
                  <button type="button" onClick={handleButtonClick} className="story-romantic-button">
                  <img src={heartEmoji} height={35} width={35}></img>
                    Je veux une histoire romantique
                  </button>
                  {isPopupVisible && (
                    <PasswordPopup
                      onClose={handleClosePopup}
                      onSubmit={handleSubmitPassword}
                    />
                  )}
                  <button type="button" onClick={enterHot}  className="story-hot-button">
                  <img src={FireEmoji} height={35} width={35}></img>
                    Je veux une histoire torride
                  </button>
                </div>
              </form>
              <div className='doubleFleche'>
              <img src={doublefleche} height={50} width={60} onClick={scrollToBottom}></img>
              </div>
              <div className="exampleStory">
                  <div>
                    Histoire de Alex
                    <div className='AlexStory'>

                    </div>
                  </div>
                  <div>
                    Histoire de Charles
                    <div className='AlexStory'>

                    </div>
                  </div>
              </div>
              <div ref={bottomRef}></div>
            </div>
        </div>
      );
}