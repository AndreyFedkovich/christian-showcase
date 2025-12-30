import { UniversalSlide } from '@/types/slides';
import ProfileSlide from '@/components/ProfileSlide';
import StorySlide from '@/components/StorySlide';
import StoryImageSlide from '@/components/StoryImageSlide';
import ReflectionSlide from '@/components/ReflectionSlide';
import ConclusionSlide from '@/components/ConclusionSlide';
import ScriptureDarkSlide from '@/components/ScriptureDarkSlide';
import HermeneuticsSlide from '@/components/HermeneuticsSlide';
import IntroductionSlide from '@/components/IntroductionSlide';
import IntroImageSlide from '@/components/IntroImageSlide';
import PracticalExampleSlide from '@/components/PracticalExampleSlide';
import DialogueQuestionSlide from '@/components/DialogueQuestionSlide';
import DialogueAnswerSlide from '@/components/DialogueAnswerSlide';
import DialogueAnswerImageSlide from '@/components/DialogueAnswerImageSlide';
import ArgumentSlide from '@/components/ArgumentSlide';
import DramaSceneSlide from '@/components/DramaSceneSlide';
import DramaActSlide from '@/components/DramaActSlide';
import DramaClimaxSlide from '@/components/DramaClimaxSlide';
import DramaImageSlide from '@/components/DramaImageSlide';
import DramaScriptureSlide from '@/components/DramaScriptureSlide';
import DramaParallelSlide from '@/components/DramaParallelSlide';
import DramaSurveySlide from '@/components/DramaSurveySlide';
import DramaGenealogySlide from '@/components/DramaGenealogySlide';
import GodExistsClimaxSlide from '@/components/GodExistsClimaxSlide';
import TimelineSlideComponent from '@/components/TimelineSlide';
import KingProfileSlideComponent from '@/components/KingProfileSlide';
import ProphetProfileSlideComponent from '@/components/ProphetProfileSlide';
import TimelineEraSlideComponent from '@/components/TimelineEraSlide';
import TimelineIntroSlideComponent from '@/components/TimelineIntroSlide';
import TimelineOverviewSlideComponent from '@/components/TimelineOverviewSlide';
import TimelineVerticalSlide from '@/components/TimelineVerticalSlide';
import TimelineVerticalSlideComponent from '@/components/TimelineVerticalSlide';

interface SlideRendererProps {
  slide: UniversalSlide;
  direction: 'next' | 'prev';
  slideNumber?: number;
}

const SlideRenderer = ({ slide, direction, slideNumber }: SlideRendererProps) => {
  switch (slide.type) {
    case 'profile':
      return (
        <ProfileSlide 
          disciple={slide} 
          slideNumber={slideNumber || 1} 
          direction={direction} 
        />
      );
    case 'introduction':
      return <IntroductionSlide slide={slide as any} direction={direction} />;
    case 'intro-image':
      return <IntroImageSlide slide={slide as any} direction={direction} />;
    case 'story':
      return <StorySlide slide={slide as any} direction={direction} />;
    case 'story-image':
      return <StoryImageSlide slide={slide as any} direction={direction} />;
    case 'reflection':
      return <ReflectionSlide slide={slide as any} direction={direction} />;
    case 'conclusion':
      return <ConclusionSlide slide={slide as any} direction={direction} />;
    case 'scripture-dark':
      return <ScriptureDarkSlide slide={slide as any} direction={direction} />;
    case 'hermeneutics':
      return <HermeneuticsSlide slide={slide as any} direction={direction} />;
    case 'practical-example':
      return <PracticalExampleSlide slide={slide as any} direction={direction} />;
    case 'dialogue-question':
      return <DialogueQuestionSlide slide={slide as any} direction={direction} />;
    case 'dialogue-answer':
      return <DialogueAnswerSlide slide={slide as any} direction={direction} />;
    case 'dialogue-answer-image':
      return <DialogueAnswerImageSlide slide={slide as any} direction={direction} />;
    case 'argument':
      return <ArgumentSlide slide={slide as any} direction={direction} />;
    case 'drama-scene':
      return <DramaSceneSlide slide={slide as any} direction={direction} />;
    case 'drama-act':
      return <DramaActSlide slide={slide as any} direction={direction} />;
    case 'drama-climax':
      return <DramaClimaxSlide slide={slide as any} direction={direction} />;
    case 'drama-image':
      return <DramaImageSlide slide={slide as any} direction={direction} />;
    case 'drama-scripture':
      return <DramaScriptureSlide slide={slide as any} direction={direction} />;
    case 'drama-parallel':
      return <DramaParallelSlide slide={slide as any} direction={direction} />;
    case 'drama-survey':
      return <DramaSurveySlide slide={slide as any} direction={direction} />;
    case 'drama-genealogy':
      return <DramaGenealogySlide slide={slide as any} direction={direction} />;
    case 'god-exists-climax':
      return <GodExistsClimaxSlide slide={slide as any} direction={direction} />;
    case 'intro-hermeneutics':
      // Handled separately in IntroSlide
      return null;
    case 'timeline':
      return <TimelineSlideComponent slide={slide as any} direction={direction} />;
    case 'timeline-vertical':
      return <TimelineVerticalSlideComponent slide={slide as any} direction={direction} />;
    case 'timeline-intro':
      return <TimelineIntroSlideComponent slide={slide as any} direction={direction} />;
    case 'timeline-overview':
      return <TimelineOverviewSlideComponent slide={slide as any} direction={direction} />;
    case 'timeline-era':
      return <TimelineEraSlideComponent slide={slide as any} direction={direction} />;
    case 'king-profile':
      return <KingProfileSlideComponent slide={slide as any} direction={direction} />;
    case 'prophet-profile':
      return <ProphetProfileSlideComponent slide={slide as any} direction={direction} />;
    default:
      return null;
  }
};

export default SlideRenderer;
