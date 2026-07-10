import Cal from '@calcom/embed-react'

export default function Schedule() {
  return (
    <main className="cal-page">
      <Cal
        calLink="raindfwphotos/request-availability"
        config={{
          layout: 'week_view',
          theme: 'dark',
        }}
        style={{
          width: '100%',
          height: 'calc(100dvh - 70px)',
          overflow: 'auto',
        }}
      />
    </main>
  )
}
