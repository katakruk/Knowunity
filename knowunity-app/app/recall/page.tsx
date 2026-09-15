import { RecallFlow } from './RecallFlow'
import { isRecallState } from './state'

/**
 * The recall takeover.
 *
 * `searchParams` is a Promise in this version of Next, so it is awaited here in
 * the server component and the resolved value handed to the client flow. That
 * avoids a `useSearchParams()` Suspense boundary for something known at request
 * time.
 *
 * `?state=` gives every screen a URL and `?exit=1` raises the exit confirmation
 * over it. See SPEC.md's verification steps.
 */
export default async function RecallPage(props: PageProps<'/recall'>) {
  const params = await props.searchParams
  const raw = Array.isArray(params.state) ? params.state[0] : params.state
  const exit = Array.isArray(params.exit) ? params.exit[0] : params.exit

  return (
    <RecallFlow
      initialState={isRecallState(raw) ? raw : undefined}
      initialExit={exit === '1'}
    />
  )
}
