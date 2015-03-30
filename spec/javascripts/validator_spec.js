describe("ICO validator", function() {
  var ico_list, i;
  ico_list = ['61499609', '25275500', '29233011'];
  for( i in ico_list ) if( ico_list.hasOwnProperty(i) ) {
    ico_valid = ico_list[i];
    it("ICO " + ico_valid + " is valid", function() {
      expect(ico_validator.valid_ico(ico_valid)).toBeTruthy();
    });
  }
  ico_list = [null, '', '1', 123, '1111111X', '00000000', '614996097', '123456789'];
  for( i in ico_list ) if( ico_list.hasOwnProperty(i) ) {
    ico_invalid = ico_list[i];
    it("ICO is invalid with value " + ico_invalid, function() {
      expect(ico_validator.valid_ico(ico_invalid)).toBeFalsy();
    });
  }
});

