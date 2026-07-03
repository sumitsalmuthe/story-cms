import WriterLayout from "../../components/writer/WriterLayout";

function Drafts() {
  return (
    <WriterLayout>

      <div
        style={{
          padding:40,
          color:"white"
        }}
      >

        <h1>Draft Stories</h1>

        <p>
          Your unfinished stories will appear here.
        </p>

      </div>

    </WriterLayout>
  );
}

export default Drafts;