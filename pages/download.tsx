import Page from "../components/page";
import { allV1Versions, allVersions, baseDownloadLink } from "../links";

function V2() {
  return (
    <table className="table-auto text-blue-200">
      {allVersions.reverse().map((v) => (
        <tbody>
          <tr>
            <td className="text-white">{v}</td>
            <td className="pa-4">
              <a href={`${baseDownloadLink}/${v}/Chatterino.Installer.exe`}>
                Windows Installer
              </a>
            </td>
            <td>
              <a href={`${baseDownloadLink}/${v}/Chatterino.Portable.zip`}>
                Windows Portable
              </a>
            </td>
            <td>
              <a href={`${baseDownloadLink}/${v}/Chatterino.dmg`}>
                Mac Installer
              </a>
            </td>
            <td>
              <a href={`${baseDownloadLink}/${v}/Chatterino-x86_64.AppImage`}>
                Linux AppImage
              </a>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
}

function V1() {
  return (
    <div>
      Legacy (really old + windows-only):{" "}
      {allV1Versions.reverse().map((v) => (
        <div>
          <a key={v} href={`${baseDownloadLink}/1/chatterino-win-${v}.zip`}>
            {v}
          </a>
        </div>
      ))}
    </div>
  );
}

export default function Downloads() {
  return (
    <Page title="Old Builds - Chatterino">
      <div className="w-max m-auto">
        <h1 className="py-16">Old Builds</h1>
        <V2 />
        {/* <V1 /> */}
      </div>
    </Page>
  );
}
