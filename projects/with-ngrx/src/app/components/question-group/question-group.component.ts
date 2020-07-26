import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { QuestionGroupsService } from 'src/app/services/question-groups/question-groups.service';
import { CurrentQuestionGroupActionTypes } from 'src/app/state/currentQuestionGroup/actions';
import { CurrentQuestionGroup } from 'src/app/state/currentQuestionGroup/entities';
import { State } from 'src/app/state/definition';
import { QuestionsActionTypes } from 'src/app/state/questions/actions';

@Component({
  selector: 'app-question-group',
  templateUrl: './question-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionGroupComponent implements OnInit, OnDestroy {
  private id: number;
  private subscription: Subscription[] = [];
  questionGroup: any;
  sectionId = 0;

  constructor(
    private store: Store<State>,
    private questionGroupsService: QuestionGroupsService,
    private activatedroute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription.push(
      this.activatedroute.paramMap.subscribe(params => {
        this.id = +params.get('id');
        this.getQuestionGroup();
      })
    );
  }

  ngOnDestroy() {
    this.subscription.forEach(s => s.unsubscribe());
  }

  loadSection(sectionId: number): void {
    this.sectionId = sectionId;
  }

  isCurrentSection(sectionId: number): boolean {
    return this.sectionId === sectionId;
  }

  private getQuestionGroup() {
    this.subscription.push(
      this.questionGroupsService.get(this.id).subscribe(questionGroup => {
        this.questionGroup = questionGroup;
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
}
