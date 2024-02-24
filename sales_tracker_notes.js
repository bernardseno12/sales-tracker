document.addEventListener('DOMContentLoaded', function(){
    const Notes = {
        Init: function(config){
            this.config = config;

            this.BindEvents();
        },
        BindEvents: function(){
            let here = this.config;

            here.btn_add.addEventListener('click', this.CreateNotes);
        },
        CreateNoteElement: (id, content)=>{
            const self = Notes.config,
                  element = document.createElement('textarea');
            element.classList = 'txt-note';
            element.value = content;
            element.placeholder = 'Empty Note...';

            element.addEventListener('dblclick', ()=> {
                const doDelete = confirm('Delete this note?');
                
                if(doDelete){
                    Notes.DeleteNotes(id, element);
                }
            });

            return element;
        },
        CreateNotes: ()=>{
            const self = Notes.config;
            const noteObj = {
                id: Math.floor(Math.random() * 1000000),
                content: ''
            };
            const noteElement = Notes.CreateNoteElement(noteObj.id, noteObj.content);
            const randomColor = Math.floor(Math.random() * 3);

            switch(randomColor){
                case 0:
                    noteElement.style.backgroundColor = `rgb(215, 247, 242)`;
                    break;
                case 1:
                    noteElement.style.backgroundColor = `rgb(255, 244, 225)`;
                    break;
                case 2:
                    noteElement.style.backgroundColor = `rgb(213, 224, 255)`;
                    break;
                default:
                    break;
            }

            self.div_app.insertBefore(noteElement, self.btn_add);
        },
        DeleteNotes: (id, element)=> {
            const self = Notes.config;
            
            self.div_app.removeChild(element);
        }
    };
    Notes.Init({
        btn_add                :                  document.querySelector('.btn-add'),
        div_app                :                  document.querySelector('#div-app'),
    })
});