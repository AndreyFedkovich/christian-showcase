import { UniversalSlide } from '@/types/slides';
import ProfileSlide from '@/components/ProfileSlide';
import StorySlide from '@/components/StorySlide';
import ReflectionSlide from '@/components/ReflectionSlide';
import ConclusionSlide from '@/components/ConclusionSlide';
import ScriptureDarkSlide from '@/components/ScriptureDarkSlide';
import HermeneuticsSlide from '@/components/HermeneuticsSlide';
import IntroductionSlide from '@/components/IntroductionSlide';
import PracticalExampleSlide from '@/components/PracticalExampleSlide';
import DialogueQuestionSlide from '@/components/DialogueQuestionSlide';
import DialogueAnswerSlide from '@/components/DialogueAnswerSlide';
import ArgumentSlide from '@/components/ArgumentSlide';
import DramaSceneSlide from '@/components/DramaSceneSlide';
import DramaActSlide from '@/components/DramaActSlide';
import DramaClimaxSlide from '@/components/DramaClimaxSlide';

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
    case 'story':
      return <StorySlide slide={slide as any} direction={direction} />;
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
    case 'argument':
      return <ArgumentSlide slide={slide as any} direction={direction} />;
    case 'drama-scene':
      return <DramaSceneSlide slide={slide as any} direction={direction} />;
    case 'drama-act':
      return <DramaActSlide slide={slide as any} direction={direction} />;
    case 'drama-climax':
      return <DramaClimaxSlide slide={slide as any} direction={direction} />;
    case 'intro-hermeneutics':
      // Handled separately in IntroSlide
      return null;
    default:
      return null;
  }
};

export default SlideRenderer;
