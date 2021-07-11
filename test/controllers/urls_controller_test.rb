require 'test_helper'

class UrlsControllerTest < ActionDispatch::IntegrationTest
  test 'list all urls in the database' do
    Url.create(long_url: 'https://facebook.com', short_url: 'https://sample.com/test1')
    Url.create(long_url: 'https://google.com', short_url: 'https://sample.com/test2')
    get urls_url
    assert_response :success
    response_body = response.parsed_body
    assert_equal Url.all.count, response_body['urls'].length
  end
end
