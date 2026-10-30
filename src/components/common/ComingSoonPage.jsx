import Card from '../ui/Card'

function ComingSoonPage({ title }) {
  return (
    <div>
      <h1 className="text-[28px] font-bold tracking-tight md:text-[34px]">{title}</h1>
      <Card className="mt-6 p-8">
        <p className="font-semibold">This section is not built yet.</p>
        <p className="mt-1 text-muted">It will be added once its design reference is supplied.</p>
      </Card>
    </div>
  )
}

export default ComingSoonPage
