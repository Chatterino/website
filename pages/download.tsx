import Page from "../components/page";
import { allVersions, baseDownloadLink } from "../links";

function V2() {
  return (
    <table className="table-auto text-blue-200">
      {[...allVersions].reverse().map((v) => (
        <tbody>
          <tr>
            <td className="text-white">{v}</td>
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
      <div className="w-max m-auto">
        <h1 className="py-16">Old Builds</h1>
        <V2 />
      </div>
    </Page>
  );
}
