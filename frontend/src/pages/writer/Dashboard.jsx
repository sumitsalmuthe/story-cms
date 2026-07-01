import WriterLayout from "../../components/writer/WriterLayout";
import WelcomeBanner from "../../components/writer/WelcomeBanner";
import StatsGrid from "../../components/writer/StatsGrid";
import RecentStories from "../../components/writer/RecentStories";

function Dashboard() {
  return (
    <WriterLayout>

      <WelcomeBanner />

      <StatsGrid />

      <RecentStories />

    </WriterLayout>
  );
}

export default Dashboard;