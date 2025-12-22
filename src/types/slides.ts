// Universal slide types for all presentations
import { 
  StorySlide, 
  ReflectionSlide as SeminarReflectionSlide, 
  ConclusionSlide as SeminarConclusionSlide, 
  ScriptureDarkSlide, 
  SeminarIntroductionSlide 
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
  GodExistsReflectionSlide
} from '@/data/god-exists';
import {
  DramaSceneSlide,
  DramaActSlide,
  DramaClimaxSlide,
  DramaImageSlide,
  DramaScriptureSlide,
  DramaParallelSlide
} from '@/data/redemption-drama';
import { Disciple } from '@/data/disciples';

// Profile slide type for disciples
export interface ProfileSlide extends Disciple {
  type: 'profile';
}

// Universal union type for all slides
export type UniversalSlide = 
  | StorySlide 
  | SeminarReflectionSlide 
  | SeminarConclusionSlide 
  | ScriptureDarkSlide 
  | SeminarIntroductionSlide
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
  | DramaSceneSlide
  | DramaActSlide
  | DramaClimaxSlide
  | DramaImageSlide
  | DramaScriptureSlide
  | DramaParallelSlide
  | ProfileSlide;
