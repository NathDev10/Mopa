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
          const response = await axios.post('https://sheltered-cove-94091-9084cf6c4c08.herokuapp.com/generate', storyData);
          const texte = response.data.texte;
          console.log('Réponse générée:', texte);
      
          // Appeler la route pour générer l'audio
          const audioResponse = await axios.post('https://sheltered-cove-94091-9084cf6c4c08.herokuapp.com/generate_audio', { texte });
          const taskId = audioResponse.data.task_id;
          console.log('ID de la tâche de génération audio:', taskId);
      
          // Vérifier périodiquement l'état de la tâche
          let audioUrl = null;
          while (!audioUrl) {
            console.log('Vérification de l état de la tâche...');
            const taskResponse = await axios.get(`https://sheltered-cove-94091-9084cf6c4c08.herokuapp.com/get_audio/${taskId}`);
            if (taskResponse.data.state === 'SUCCESS' && taskResponse.data.result) {
              audioUrl = taskResponse.data.result;
              console.log('Audio prêt:', audioUrl);
            } else if (taskResponse.data.state === 'FAILURE') {
              throw new Error('Échec de la génération de laudio');
            }
            await new Promise(resolve => setTimeout(resolve, 5000)); // Attendre 5 secondes avant de vérifier à nouveau
          }
      
          // Naviguer vers la page de l'histoire avec le texte et l'URL de l'audio
          navigate('/mystory', { state: { Text: texte, AudioUrl: audioUrl } });
        } catch (error) {
          console.error('Erreur', error);
        }
        setLoading(false);
    }
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