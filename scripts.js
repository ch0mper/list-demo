const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || []; // array of objects to store name and status
const checkAllButton = document.querySelector('.check-all');
function addItem(e) {
  e.preventDefault();
  let text = (this.querySelector('[name=item]')).value
  let item = {
    text,
    done: false
  }
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items))
  this.reset();
}
populateList = (plates = [], platesList) => {
  platesList.innerHTML = plates.map( (plate, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
  }).join(''); // takes the array, and gives us a string for innerHTML
}
function toggleDone(e) {
  if (!e.target.matches('input')) return;
  let el = e.target;
  items[el.dataset.index].done = !items[el.dataset.index].done
  localStorage.setItem('items', JSON.stringify(items))
  populateList(items, itemsList)
}
checkAll = (plates = [], platesList) => {
  platesList.innerHTML = plates.map( (plate, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" checked />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
  }).join('');
}
addItems.addEventListener('submit', addItem)
itemsList.addEventListener('click', toggleDone)
checkAllButton.addEventListener('click', () => checkAll(items, itemsList))
populateList(items, itemsList)
