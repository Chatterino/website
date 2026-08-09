import Page from "../components/page";
import { allVersions, baseDownloadLink } from "../links";

function V2() {
  return (
    <table className="builds-table">
      {[...allVersions].reverse().map((v) => (
        <tbody>
          <tr>
            <td className="builds-version">{v}</td>
            <td>
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

export default function Downloads() {
  return (
    <Page title="Old Builds - Chatterino">
      <div className="builds">
        <h1 className="builds-title">Old Builds</h1>
        <V2 />
      </div>
    </Page>
  );
}
