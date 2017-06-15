import Ember from 'ember';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';

const COLORS = {
  blue: [ '#bbdefb' , '#2196f3' ],
  green: [ '#c8e6c9', '#4caf50' ],
  red: [ '#ffcdd2', '#f44336' ]
};

export default Ember.Component.extend({

  data: [],
  color: 'blue',

  tooltipTarget: Ember.computed('hoveredLabel', function() {
    return select(this.$('svg')[0]).selectAll('rect')
      .filter(data => data.label === this.get('hoveredLabel'))
      .node();
  }),

  didInsertElement() {
    let counts = this.get('data').map(data => data.count);
    let yScale = scaleLinear()
      .domain([ 0, Math.max(...counts) ])
      .range([ 0, 100 ]);

    let color = scaleLinear()
      .domain([ 0, Math.max(...counts) ])
      .range(COLORS[this.get('color')]);

    let xScale = scaleBand()
      .domain(this.get('data').map(data => data.label))
      .range([ 0, 100 ])
      .paddingInner(0.12);

    let svg = select(this.$('svg')[0]);

    svg.selectAll('rect').data(this.get('data'))
      .enter()
      .append('rect')
      .attr('width', `${xScale.bandwidth()}%`)
      .attr('height', data => `${yScale(data.count)}%`)
      .attr('x', data => `${xScale(data.label)}%`)
      .attr('y', data => `${100 - yScale(data.count)}%`)
      .attr('fill', data => color(data.count))
      .on('mouseover', data => {
        this.set('hoveredLabel', data.label);
      })
      .on('mouseout', () => {
        this.set('hoveredLabel', null);
      });
  }

});
