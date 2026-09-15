import { MainScreen, DEMO_RESUME_TOPIC, type PromoState } from './main/MainScreen'

/**
 * The AI chat main screen. Figma 13610:10167.
 *
 * The only entry point to active recall, so it is the app's root.
 *
 * `?promo=chip` shows Speak to Learn demoted into the rail, and `?resume=1` shows
 * the unfinished-session offer in the thread. Both exist so the states are
 * reachable without faking an impression count or abandoning a real session.
 */
export default async function Home(props: PageProps<'/'>) {
  const params = await props.searchParams
  const promo = Array.isArray(params.promo) ? params.promo[0] : params.promo
  const resume = Array.isArray(params.resume) ? params.resume[0] : params.resume

  return (
    <MainScreen
      promo={promo === 'chip' ? ('chip' as PromoState) : ('focal' as PromoState)}
      resumeTopic={resume === '1' ? DEMO_RESUME_TOPIC : undefined}
      resumeProgress={4}
    />
  )
}
