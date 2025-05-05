import './styles.css';
import { fetchBreeds, fetchCatByBreed } from './the-cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const elements = {
  selector: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  reserveLoaderText: document.querySelector('.loader-text')
};

elements.loader.classList.add('is-hidden');
elements.error.classList.add('is-hidden');
elements.catInfo.classList.add('is-hidden');
elements.reserveLoaderText.classList.add('is-hidden');

async function populateBreedSelect() {
  try {
    const breeds = await fetchBreeds();
    const breedOptions = breeds.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('');
    
    elements.selector.innerHTML = breedOptions;
    
    new SlimSelect({
      select: elements.selector,
    });
  } catch (error) {
    onError(error);
  }
}

populateBreedSelect();

function onSelectBreed(event) {
  event.preventDefault();
  onLoad();
  const breedId = event.target.value;
  displayCatInfo(breedId);
}

async function displayCatInfo(breedId) {
    try {
      const breeds = await fetchBreeds();
      const selectedBreed = breeds.find(breed => breed.id === breedId);
      
      const catInfo = await fetchCatByBreed(breedId);
      const catData = catInfo[0];
      const { url } = catData;
      
      const { name, description, temperament } = selectedBreed;
  
      const catInfoMarkup = `
        <div class="cat">
          <div class="cat__img">
            <img src="${url}" alt="cat ${name}" width="500">
          </div>
          <div class="cat__info-box">
            <h1 class="cat__info-title">${name}</h1>
            <p class="cat__info-description">${description}</p>
            <p class="cat__info-temperament"><span>Temperament: </span>${temperament}</p>
          </div>
        </div>`;

      elements.catInfo.innerHTML = catInfoMarkup;
      onEmergence();
    } catch (error) {
        onError(error);
      }
}

elements.selector.addEventListener('change', onSelectBreed);

function onLoad() {
  elements.loader.classList.remove('is-hidden');
  elements.reserveLoaderText.classList.add('is-hidden');
  elements.catInfo.classList.add('is-hidden');
  elements.error.classList.add('is-hidden');
}

function onEmergence() {
  elements.loader.classList.add('is-hidden');
  elements.reserveLoaderText.classList.add('is-hidden');
  elements.catInfo.classList.remove('is-hidden');
}

function onError(error) {
  elements.error.classList.add('is-hidden');
  Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
  console.error(error);
  elements.loader.classList.remove('is-hidden');
  elements.reserveLoaderText.classList.add('is-hidden');
}
