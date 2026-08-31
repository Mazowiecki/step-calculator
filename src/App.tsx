import { Card, CardContent } from '@mui/material';
import { AppHeader } from './components/AppHeader';
import { PreviewCard } from './components/PreviewCard';
import { StepForm } from './components/StepForm';
import { SummarySection } from './components/SummarySection';

const App = () => {
  return (
    <main className='app-shell'>
      <AppHeader />

      <section className='workspace'>
        <Card>
          <CardContent>
            <StepForm />
          </CardContent>
        </Card>
        <PreviewCard />
      </section>

      <SummarySection />
    </main>
  );
};

export default App;
