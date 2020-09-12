import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { QuestionGroupsService } from 'src/app/services/question-groups/question-groups.service';
import { TopicsService } from 'src/app/services/topics/topics.service';
import { selectAnswers } from 'src/app/state/answers/selectors';
import { CurrentQuestionGroupActionTypes } from 'src/app/state/currentQuestionGroup/actions';
import { CurrentQuestionGroup } from 'src/app/state/currentQuestionGroup/entities';
import { State } from 'src/app/state/definition';
import { QuestionsActionTypes } from 'src/app/state/questions/actions';
import { selectQuestions } from 'src/app/state/questions/selectors';

@Component({
  selector: 'app-question-group',
  templateUrl: './question-group.component.html'
})
export class QuestionGroupComponent implements OnInit, OnDestroy {
  questionGroup: any;
  sectionId = 0;
  totalQuestions = 0;
  totalAnswers = 0;
  private id: number;
  private subscriptions: Subscription[] = [];
  topics: any[] = [];
  selectedTopicIds: any[] = [];

  constructor(
    private store: Store<State>,
    private questionGroupsService: QuestionGroupsService,
    private activatedroute: ActivatedRoute,
    private topicsService: TopicsService
  ) {}

  ngOnInit() {
    this.loadTopics();
    this.subscriptions.push(
      this.activatedroute.paramMap.subscribe(params => {
        this.id = +params.get('id');
        this.getQuestionGroup();
      })
    );
    this.subscribeToStateChange();
  }

  private subscribeToStateChange() {
    this.subscriptions.push(this.store.select(selectQuestions).subscribe(q => (this.totalQuestions = q.length)));
    this.subscriptions.push(this.store.select(selectAnswers).subscribe(a => (this.totalAnswers = a.length)));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private loadTopics() {
    const subscription = this.topicsService.getAll().subscribe(topics => {
      this.topics = topics;
      subscription.unsubscribe();
    });
  }

  loadSection(sectionId: number): void {
    this.sectionId = sectionId;
  }

  isCurrentSection(sectionId: number): boolean {
    return this.sectionId === sectionId;
  }

  private getQuestionGroup() {
    this.subscriptions.push(
      this.questionGroupsService.get(this.id).subscribe(questionGroup => {
        this.questionGroup = questionGroup;
        this.selectedTopicIds = questionGroup.topicIds;
        this.dispatchStoreLoadActions({ questionGroup, questions: questionGroup.questions });
      })
    );
  }

  private dispatchStoreLoadActions({ questionGroup, questions }): void {
    const currentQuestionGroup: CurrentQuestionGroup = { id: questionGroup.id, name: questionGroup.name };
    this.store.dispatch({
      type: CurrentQuestionGroupActionTypes.LOAD,
      payload: { questionGroup: currentQuestionGroup }
    });
    this.store.dispatch({
      type: QuestionsActionTypes.LOAD,
      payload: {
        questions: questions.map(({ id, questionGroupId, text }) => ({
          id,
          questionGroupId,
          text,
          isOpened: false
        }))
      }
    });
  }

  receiveMessageFromContent(event: { action: string; value: any }) {
    switch (event.action) {
      case 'content-question-add':
        // this.store.dispatch({ type: QuestionsActionTypes.CREATE, payload: { text: event.value.text } });
        break;
      case 'content-question-update':
        // this.store.dispatch({ type: QuestionsActionTypes.EDIT, payload: { question: event.value.question } });
        break;
      case 'content-question-delete':
        // this.store.dispatch({ type: QuestionsActionTypes.DELETE, payload: { questionId: event.value.questionId } });
        break;
      case 'content-question-toggle':
        // this.store.dispatch({ type: QuestionsActionTypes.TOGGLE, payload: { questionId: event.value.questionId } });
        break;
      case 'content-answer-add':
        // this.store.dispatch({ type: AnswersActionTypes.CREATE, payload: { answer: event.value.answer } });
        break;
      case 'content-answer-update':
        // this.store.dispatch({ type: AnswersActionTypes.EDIT, payload: { answer: event.value.answer } });
        break;
      case 'content-answer-delete':
        // this.store.dispatch({ type: AnswersActionTypes.DELETE, payload: { answerId: event.value.answerId } });
        break;
    }
  }
}
