import startCards from './cards'
import startText from './text'
import startFire from './fire'

const buttonCards = document.createElement('button');
buttonCards.innerText = 'Cards';
buttonCards.onclick = () => {
	document.body.innerHTML = '';
	startCards()
};
document.body.appendChild(buttonCards);

const buttonText = document.createElement('button');
buttonText.innerText = 'Mixed Text';
buttonText.onclick = () => {
	document.body.innerHTML = '';
	startText()
};
document.body.appendChild(buttonText);

const buttonFire = document.createElement('button');
buttonFire.innerText = 'Fire';
buttonFire.onclick = () => {
	document.body.innerHTML = '';
	startFire()
};
document.body.appendChild(buttonFire);
