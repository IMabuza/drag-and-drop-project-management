import { autobind } from "../decorators/autobind.js";
import { Draggable } from "../models/drag-drop.js";
import { Project } from "../models/project.js";
import { Component } from "./base-component.js";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{
  
    private project: Project;
  
    get persons(){
      if(this.project.people === 1){
        return '1 person';
      }else{
        return `${this.project.people} people`
      }
    }
  
    constructor(hostId: string, project: Project){
      super('single-project', hostId, false, project.id);
      this.project = project;
  
      this.configure();
      this.renderContent();
    }
  
    @autobind
    dragStartHandler(event: DragEvent): void {
      event.dataTransfer!.setData('text/plain', this.project.id);
      event.dataTransfer!.effectAllowed = 'move';
      
    }
  
    dragEndHandler(_: DragEvent): void {
      console.log('DragEnd');
    }
  
    configure(){
      this.sectionElement.addEventListener('dragstart', this.dragStartHandler);
      this.sectionElement.addEventListener('dragend', this.dragEndHandler)
    };
    renderContent(){
      this.sectionElement.querySelector('h2')!.textContent = this.project.title;
      this.sectionElement.querySelector('h3')!.textContent = this.persons + ' assigned';
      this.sectionElement.querySelector('p')!.textContent = this.project.description;
    };
  }