<?php

class Stripe_Customer extends Stripe_ApiResource
{
  public static function constructFrom($values, $apiKey=null)
  {
    $class = get_class();
    return self::scopedConstructFrom($class, $values, $apiKey);
  }

  public static function retrieve($id, $apiKey=null)
  {
    $class = get_class();
    return self::_scopedRetrieve($class, $id, $apiKey);
  }

  public static function all($params=null, $apiKey=null)
  {
    $class = get_class();
    return self::_scopedAll($class, $params, $apiKey);
  }

  public static function create($params=null, $apiKey=null)
  {
    $class = get_class();
    return self::_scopedCreate($class, $params, $apiKey);
  }

  public function save()
  {
    $class = get_class();
    return self::_scopedSave($class);
  }

  public function delete($params=null)
  {
    $class = get_class();
    return self::_scopedDelete($class, $params);
  }

  public function addproposalItem($params=null)
  {
    if (!$params)
      $params = array();
    $params['customer'] = $this->id;
    $ii = Stripe_proposalItem::create($params, $this->_apiKey);
    return $ii;
  }

  public function proposals($params=null)
  {
    if (!$params)
      $params = array();
    $params['customer'] = $this->id;
    $proposals = Stripe_proposal::all($params, $this->_apiKey);
    return $proposals;
  }

  public function proposalItems($params=null)
  {
    if (!$params)
      $params = array();
    $params['customer'] = $this->id;
    $iis = Stripe_proposalItem::all($params, $this->_apiKey);
    return $iis;
  }

  public function charges($params=null)
  {
    if (!$params)
      $params = array();
    $params['customer'] = $this->id;
    $charges = Stripe_Charge::all($params, $this->_apiKey);
    return $charges;
  }

  public function updateSubscription($params=null)
  {
    $requestor = new Stripe_ApiRequestor($this->_apiKey);
    $url = $this->instanceUrl() . '/subscription';
    list($response, $apiKey) = $requestor->request('post', $url, $params);
    $this->refreshFrom(array('subscription' => $response), $apiKey, true);
    return $this->subscription;
  }

  public function cancelSubscription($params=null)
  {
    $requestor = new Stripe_ApiRequestor($this->_apiKey);
    $url = $this->instanceUrl() . '/subscription';
    list($response, $apiKey) = $requestor->request('delete', $url, $params);
    $this->refreshFrom(array('subscription' => $response), $apiKey, true);
    return $this->subscription;
  }

  public function deleteDiscount()
  {
    $requestor = new Stripe_ApiRequestor($this->_apiKey);
    $url = $this->instanceUrl() . '/discount';
    list($response, $apiKey) = $requestor->request('delete', $url);
    $this->refreshFrom(array('discount' => null), $apiKey, true);
  }
}
