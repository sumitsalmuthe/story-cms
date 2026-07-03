import WriterLayout from "../../components/writer/WriterLayout";

function Settings() {
  return (
    <WriterLayout>

      <div
        style={{
          padding:40,
          color:"white"
        }}
      >

        <h1>Settings</h1>

        <br/>

        <button>Edit Profile</button>

        <br/><br/>

        <button>Change Password</button>

        <br/><br/>

        <button>Delete Account</button>

      </div>

    </WriterLayout>
  );
}

export default Settings;