import { Component, OnInit } from '@angular/core';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: any[] = [];
  userEmail: string = '';
  loading: boolean = false;
  private client = generateClient<Schema>();

  constructor(public authenticator: AuthenticatorService) { }

  async ngOnInit() {
    // Get user email
    this.userEmail = this.authenticator.user?.signInDetails?.loginId || 'User';

    // Load todos on component init
    await this.loadTodos();
  }

  async loadTodos() {
    this.loading = true;
    try {
      const { data: todos, errors } = await this.client.models.Todo.list();

      if (errors) {
        console.error('Error loading todos', errors);
        return;
      }
      this.todos = todos || [];
      console.log('Loaded todos: ', this.todos);
    } catch (error) {
      console.error('Error loading todos: ', error);
    }
    finally {
      this.loading = false;
    }

  }

  async addTodo(content: string) {
    if (!content.trim()) return;

    try {
      const { data: newTodo, errors } = await this.client.models.Todo.create({
        content: content.trim()
      });

      if (errors) {
        console.error('Error creating todo:', errors);
        return;
      }

      console.log('Created todo:', newTodo);

      // Reload todos to show the new one
      await this.loadTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  async deleteTodo(id: string) {
    if (!confirm('Delete this todo? ')) return;
    try {
      const { errors } = await this.client.models.Todo.delete({ id });
      if (errors) {
        console.error('Error deletind todo: ', errors);
        return;
      }
      console.log('Deleted todo: ', id);
      this.todos = this.todos.filter(todo => todo.id !== id);
    } catch (error) {
      console.error('Error deletind todo: ', error);

    }
  }

  signOut() {
    this.authenticator.signOut();
  }
}