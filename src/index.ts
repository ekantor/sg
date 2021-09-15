import startCards from './cards'
import startText from './text'
import startFire from './fire'

const container = document.createElement('div');
container.className = 'menu';
document.body.appendChild(container);

const buttonCards = document.createElement('button');
buttonCards.innerText = 'Cards';
buttonCards.onclick = () => {
	document.body.removeChild(container);
	startCards()
};
container.appendChild(buttonCards);

const buttonText = document.createElement('button');
buttonText.innerText = 'Mixed Text';
buttonText.onclick = () => {
	document.body.removeChild(container);
	startText()
};
container.appendChild(buttonText);

const buttonFire = document.createElement('button');
buttonFire.innerText = 'Fire';
buttonFire.onclick = () => {
	document.body.removeChild(container);
	startFire()
};
container.appendChild(buttonFire);
