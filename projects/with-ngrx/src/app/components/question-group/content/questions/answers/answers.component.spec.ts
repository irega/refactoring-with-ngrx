import { FormsModule } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { Answer } from 'src/app/state/answers/entities';
import { Given } from 'src/app/state/answers/shared/answers.fixtures';
import { AnswersComponent } from './answers.component';

describe('The answers component', () => {
  let spectator: Spectator<AnswersComponent>;
  const createComponent = createComponentFactory({
    component: AnswersComponent,
    imports: [FormsModule]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should be created', () => {
    expect(spectator.fixture.componentInstance).toBeTruthy();
  });

  it('should create an answer', () => {
    const a_new_answer = 'A new answer';
    const new_answer_input = spectator.query('.create-answer-input');
    let created_answer: string;
    spectator.output<{ text: string }>('add').subscribe(answer => {
      created_answer = answer.text;
    });

    spectator.typeInElement(a_new_answer, new_answer_input);
    spectator.dispatchKeyboardEvent(new_answer_input, 'keyup', 13);

    expect(created_answer).toEqual(a_new_answer);
  });

  it('should edit an answer', () => {
    const an_answer = Given.an_answer();
    const an_answer_list = [an_answer];
    let edited_answer: Answer;
    spectator.output<Answer>('edit').subscribe(answer => {
      edited_answer = answer;
    });
    spectator.setInput('answers', an_answer_list);

    const an_edited_answer = 'Edited answer';
    let an_existing_answer_input = spectator.query(`input[id="answer-${an_answer.id}"]`);
    spectator.typeInElement(an_edited_answer, an_existing_answer_input);
    spectator.dispatchFakeEvent(an_existing_answer_input, 'focusout');

    expect(edited_answer.text).toEqual(an_edited_answer);
  });

  it('should delete an answer', () => {
    const an_answer = Given.an_answer();
    const an_answer_list = [an_answer];
    let deleted_answer_id: number;
    spectator.output<number>('delete').subscribe(deletedAnswerId => {
      deleted_answer_id = deletedAnswerId;
    });
    spectator.setInput('answers', an_answer_list);

    let an_existing_answer_delete_button = spectator.query('button');
    spectator.click(an_existing_answer_delete_button);

    expect(deleted_answer_id).toEqual(an_answer.id);
  });
});
