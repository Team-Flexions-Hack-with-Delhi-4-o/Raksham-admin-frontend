import Tabs from '../../components/ui/Tabs'
import { TABS } from './statusConfig'

function VerificationStatusTabs({ value, counts, onChange }) {
  return <Tabs tabs={TABS} value={value} counts={counts} onChange={onChange} label="Verification status" />
}

export default VerificationStatusTabs
