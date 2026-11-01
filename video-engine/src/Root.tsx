import { Composition, Folder } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { Logo } from "./HelloWorld/Logo";
import { Title } from "./HelloWorld/Title";
import { MadrasatiAd } from "./MadrasatiAd";
import { MadrasatiCinematicAd } from "./MadrasatiCinematicAd";
import { MadrasatiWorldFilm } from "./MadrasatiWorldFilm";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Elements">
        <Composition
          id="Logo"
          component={Logo}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ logoColor1: "#91EAE4", logoColor2: "#86A8E7" }}
        />
        <Composition
          id="Title"
          component={Title}
          durationInFrames={115}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ titleText: "Welcome to Remotion", titleColor: "#000000" }}
        />
      </Folder>

      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ titleText: "Welcome to Remotion", titleColor: "#000000" }}
      />

      <Composition
        id="MadrasatiWorldFilm"
        component={MadrasatiWorldFilm}
        durationInFrames={1350}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="MadrasatiCinematicAd"
        component={MadrasatiCinematicAd}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="MadrasatiAd"
        component={MadrasatiAd}
        durationInFrames={1440}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
