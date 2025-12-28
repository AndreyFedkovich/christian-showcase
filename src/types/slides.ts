// Universal slide types for all presentations
import { 
  StorySlide, 
  StoryImageSlide,
  ReflectionSlide as SeminarReflectionSlide, 
  ConclusionSlide as SeminarConclusionSlide, 
  ScriptureDarkSlide, 
  SeminarIntroductionSlide,
  IntroImageSlide as SeminarIntroImageSlide
} from '@/data/seminar';
import { 
  HermeneuticsSlide, 
  IntroHermeneuticsSlide, 
  PracticalExampleSlide, 
  IntroductionSlide as EpistlesIntroductionSlide,
  ConclusionSlide as EpistlesConclusionSlide,
  PowerSource,
  PowerSourceType
} from '@/data/epistles-structure';
import { 
  DialogueQuestionSlide, 
  DialogueAnswerSlide,
  DialogueAnswerImageSlide, 
  ArgumentSlide,
  GodExistsIntroductionSlide,
  GodExistsConclusionSlide,
  GodExistsReflectionSlide,
  GodExistsClimaxSlide
} from '@/data/god-exists';
import {
  DramaSceneSlide,
  DramaActSlide,
  DramaClimaxSlide,
  DramaImageSlide,
  DramaScriptureSlide,
  DramaParallelSlide,
  DramaSurveySlide,
  DramaGenealogySlide
} from '@/data/redemption-drama';
import {
  TimelineIntroSlide,
  TimelineDualSlide,
  KingProfileSlide,
  ProphetProfileSlide,
  TimelineEventSlide,
  TimelineChartSlide
} from '@/data/kings-prophets';
import { Disciple } from '@/data/disciples';

// Profile slide type for disciples
export interface ProfileSlide extends Disciple {
  type: 'profile';
}

// Universal union type for all slides
export type UniversalSlide = 
  | StorySlide
  | StoryImageSlide 
  | SeminarReflectionSlide
  | SeminarConclusionSlide 
  | ScriptureDarkSlide 
  | SeminarIntroductionSlide
  | SeminarIntroImageSlide
  | HermeneuticsSlide
  | IntroHermeneuticsSlide 
  | PracticalExampleSlide 
  | EpistlesIntroductionSlide
  | EpistlesConclusionSlide
  | DialogueQuestionSlide 
  | DialogueAnswerSlide
  | DialogueAnswerImageSlide 
  | ArgumentSlide
  | GodExistsIntroductionSlide
  | GodExistsConclusionSlide
  | GodExistsReflectionSlide
  | GodExistsClimaxSlide
  | DramaSceneSlide
  | DramaActSlide
  | DramaClimaxSlide
  | DramaImageSlide
  | DramaScriptureSlide
  | DramaParallelSlide
  | DramaSurveySlide
  | DramaGenealogySlide
  | TimelineIntroSlide
  | TimelineDualSlide
  | KingProfileSlide
  | ProphetProfileSlide
  | TimelineEventSlide
  | TimelineChartSlide
  | ProfileSlide;
