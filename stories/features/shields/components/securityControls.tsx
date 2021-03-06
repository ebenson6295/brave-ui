/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'

// Feature-specific components
import {
  StatFlex,
  ToggleGrid,
  Toggle,
  EmptyButton,
  ShowMoreIcon,
  ResourcesSwitchLabel,
  ToggleFlex
} from '../../../../src/features/shields'

// Component groups
import BlockedResources from './blockedReources/blockedResources'
import StaticList from './blockedReources/staticList'

// Fake data
import locale from '../fakeLocale'
import data from '../fakeData'

interface Props {
  enabled: boolean
  favicon: string
  sitename: string
}

interface State {
  openPishingMalwareBlockedList: boolean
}

export default class SecurityControls extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      openPishingMalwareBlockedList: false
    }
  }

  get pishingMalwareBlockedList () {
    const { favicon, sitename } = this.props
    return (
      <BlockedResources
        favicon={favicon}
        sitename={sitename}
        title={locale.blockPishing}
        onToggle={this.onTogglePishingMalwareBlocked}
        data={data.thirdPartyDeviceRecognitionBlocked}
      >
        <StaticList
          onClickDismiss={this.onTogglePishingMalwareBlocked}
          list={data.blockedFakeResources}
        />
      </BlockedResources>
    )
  }

  onTogglePishingMalwareBlocked = () => {
    this.setState({ openPishingMalwareBlockedList: !this.state.openPishingMalwareBlockedList })
  }

  render () {
    const { enabled } = this.props
    const { openPishingMalwareBlockedList } = this.state

    if (!enabled) {
      return null
    }

    return (
      <>
        {/* pishing toggle */}
        <ToggleGrid>
          <EmptyButton onClick={this.onTogglePishingMalwareBlocked}><ShowMoreIcon /></EmptyButton>
          <StatFlex onClick={this.onTogglePishingMalwareBlocked}>{data.pishingMalwareBlocked}</StatFlex>
          <ResourcesSwitchLabel onClick={this.onTogglePishingMalwareBlocked}>{locale.blockPishing}</ResourcesSwitchLabel>
          <ToggleFlex><Toggle checked={true} /></ToggleFlex>
        </ToggleGrid>
        {openPishingMalwareBlockedList ? this.pishingMalwareBlockedList : null}
      </>
    )
  }
}
