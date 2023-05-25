import React from 'react'
import styled from "@emotion/styled";
import {spacing} from "../styled/variables";

const ClientCard = styled.div`
  background-color: white;
  padding: ${spacing.md};
  border-radius: ${spacing.md};
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, .1);
  margin-bottom: ${spacing.md};
  width: 100%;
  max-width: 600px;
  text-align: center;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${spacing.md}
`

const ControlButton = styled.button`
  width: 25%;
  padding: 0 0 25% 0;
  height: 0;
  position: relative;
  background-color: rgb(100, 100, 255);
  outline: 0;
  border: 0;
  border-radius: ${spacing.sm};
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, .1);
`

const ButtonInner = styled.div`
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 32px;
`

const Client = ({id, setClientAction}) => {
  const goDirection = (direction) => {
    setClientAction(id, direction)
  }

  return (
    <ClientCard>
      {id}
      <ButtonWrapper>
        <ControlButton onClick={() => goDirection(0)}>
          <ButtonInner>
            ◀︎
          </ButtonInner>
        </ControlButton>
        <ControlButton onClick={() => goDirection(1)}>
          <ButtonInner>
            ▲
          </ButtonInner>
        </ControlButton>
        <ControlButton>
          <ButtonInner onClick={() => goDirection(2)}>
            ►
          </ButtonInner>
        </ControlButton>
      </ButtonWrapper>
    </ClientCard>
  )
}

export default Client
