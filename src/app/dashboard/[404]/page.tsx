/**Author: Olexiy Prokhvatylo B00847680 */

import dynamic from "next/dynamic";
const NotFound = dynamic(() => import("./NotFound"));

export default function Four04() {
  return <NotFound />;
}
