import React from 'react';
import _ from 'lodash';
import { CONSTANTS } from 'amphion';
import OptionRow from '../../../components/optionRow';
import ColorTransformer from './colorTransformer';
import { updateOptionsUtil } from '../../../utils';
import { Input, Select } from '../../../components/styled';

const {
  COLOR_TRANSFORMERS,
  DEFAULT_OPTIONS_LASERSCAN,
  LASERSCAN_STYLES,
} = CONSTANTS;

class LaserScanOptions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.updateOptions = updateOptionsUtil.bind(this);
  }

  render() {
    const { options: propsOptions } = this.props;

    const options = {
      ...DEFAULT_OPTIONS_LASERSCAN,
      ...propsOptions,
    };
    const { alpha, colorTransformer, size, style } = options;

    return (
      <>
        <OptionRow label="Style">
          <Select
            name="style"
            data-id="style"
            onChange={this.updateOptions}
            value={style}
          >
            {_.map(LASERSCAN_STYLES, lStyle => {
              return (
                <option key={lStyle} value={lStyle}>
                  {lStyle}
                </option>
              );
            })}
          </Select>
        </OptionRow>

        <OptionRow label="Size">
          <Input
            type="number"
            name="size"
            step="0.1"
            data-id="size"
            value={size}
            onChange={this.updateOptions}
          />
        </OptionRow>

        <OptionRow label="Alpha">
          <Input
            type="number"
            name="alpha"
            step="0.1"
            data-id="alpha"
            value={alpha}
            onChange={this.updateOptions}
          />
        </OptionRow>

        <OptionRow label="Color Transformer">
          <Select
            name="colorTransformer"
            data-id="colorTransformer"
            onChange={this.updateOptions}
            value={colorTransformer}
          >
            {_.map(COLOR_TRANSFORMERS, color => {
              return (
                <option key={color} value={color}>
                  {color}
                </option>
              );
            })}
          </Select>
        </OptionRow>
        <ColorTransformer
          options={options}
          updateOptions={this.updateOptions}
        />
      </>
    );
  }
}

export default LaserScanOptions;
