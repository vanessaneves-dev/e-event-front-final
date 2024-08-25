import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent {
  questions = [
    { id: 1, question: 'Como posso criar uma conta?', answer: 'Para criar uma conta, basta acessar a página de cadastro e preencher as informações necessárias.', open: false },
    { id: 2, question: 'Quais métodos de pagamento são aceitos?', answer: 'Aceitamos cartões de crédito e débito, além de transferências bancárias.', open: false },
    { id: 3, question: 'Como posso alterar minha senha?', answer: 'Você pode alterar sua senha na seção de configurações da sua conta.', open: false },
    // Adicione mais perguntas e respostas conforme necessário
  ];

  toggleDropdown(id: number) {
    this.questions = this.questions.map(question => 
      question.id === id ? { ...question, open: !question.open } : question
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Lógica para enviar o formulário
      console.log('Formulário enviado', form.value);
    }
  }
}
