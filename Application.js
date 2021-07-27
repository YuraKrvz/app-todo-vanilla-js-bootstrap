
class Application{
   constructor(args){
      this.root = args.root;
      this.list = [
         {id: 1, text: 'learn HTML', done: true, delete: false, },
         {id: 2, text: 'learn CSS', done: false, delete: false, },
         {id: 3, text: 'learn JS', done: false, delete: false, },
         {id: 4, text: 'learn react JS', done: false, delete: false, },
         {id: 5, text: 'learn redux', done: false, delete: false, },
         {id: 6, text: 'learn git-hub', done: false, delete: false, },
      ];

      this.dom = this.getBasicDOM();
      this.dom.addEventListener('click', (event)=> {
         if(event.target.dataset.add){
            this.addTodo();
         }
      });
      this.dom.querySelector('input').addEventListener('keyup', e => {
         if(e.key === 'Enter'){
            this.addTodo();
         }
      });
      //console.log(this.dom);
      this.update()
   }
//
   update(){
      this.root.append( this.dom )
      this.root.querySelector('ul').innerHTML = '';

      this.list.map(item => {
         if(item.delete){
            return;
         }

         const li = this.getBasicItem(item);
         this.dom.querySelector('ul').append( li )
               li.addEventListener('click', (event) => {
                  if(event.target.dataset.done){
                     item.done = !item.done
                     this.update()
                  } else if(event.target.dataset.delete){
                     item.delete = !item.delete;
                     this.deleteTodo(item)
                     this.update()
                  }
                  
               })
      })
      this.dom.querySelector('input').focus();
   }
   addTodo(){
      let id = this.list.length;
      const input = this.dom.querySelector('input');
         if(input.value.length > 0 || input.value !== ''){
            const value = input.value;
               this.list.push( {id: ++id, text: value, done: false, delete: false, } );
               this.update();
               input.value = ''
               input.focus();
         } else { return }
      
   }
   deleteTodo( obj ){
      return this.list.filter(item => item.delete !== obj.delete)
   }
   getBasicItem(todo){

      const div = document.createElement('div');
            div.innerHTML = `<li class="list-group-item d-flex justify-content-between" style="align-items: center;"> <strong>${todo.id}</strong>  <span class="${todo.done ? 'done' : ''}">${todo.text}</span>  <div class="btn-group"><button type="button" class="btn btn-warning" data-done="${todo.done}">done</button><button type="button" class="btn btn-danger" data-delete="false">delete</button></div> </li>`;

            return div.firstElementChild;
   }
   getBasicDOM(){
      const div = document.createElement('div');
            div.innerHTML = `
<div class="container card" style="width: 750px; margin-top: 20px; padding: 10px;">
   <h6 class="bg-light text-center" >Application with using js and bootstrap</h6>
   <div class="input-group flex-nowrap">
      <input type="text" class="form-control fst-italic" placeholder="write task" aria-label="Username" aria-describedby="addon-wrapping">
      <div class="btn-group" role="group" aria-label="Basic mixed styles example">
         <button type="button" class="btn btn-primary" data-add="true">Add</button>
      </div>
   </div>
   <ul class="list-group "></ul>
</div>`;
      return div.firstElementChild;
   }
   
};