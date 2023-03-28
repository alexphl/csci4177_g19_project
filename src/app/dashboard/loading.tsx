/**Author: Olexiy Prokhvatylo B00847680 */

export default function Loading(props: { className?: string }) {
  return (
    <div className={"flex w-full h-screen flex-auto place-content-center items-center justify-center flex-col" + props.className}>
      <div className="w-8 h-8 rounded-full bg-white/50 animate-bounce" />
    </div>
  );
}
